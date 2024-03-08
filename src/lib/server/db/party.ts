import { generateId } from "lucia";
import type { Party, PartyRole, PartyWithUsers } from "../../../model/party/Party";
import { ensureInit } from "./Db";

export const findParties = async (platform: App.Platform, userId: string): Promise<Array<{ party: Party, active: boolean, role: 'admin' | 'player' }>> => {
    const db = await ensureInit(platform);

    return await db.all('select id, name, invite_code, role, active from Parties inner join PartyUserAssoc on party_id = id and user_id=?1',
        r => ({ party: { id: r.id, inviteCode: r.invite_code, name: r.name } as Party, active: r.active === 1, role: r.role as 'admin' | 'player' }),
        userId
    );
}

export const createParty = async (platform: App.Platform, name: string, userId: string) => {
    const db = await ensureInit(platform);
    const partyId = generateId(10);

    await db.run('insert into Parties (id, invite_code, name) VALUES (?1,?2,?3)', partyId, generateId(10), name);
    await db.run('insert into PartyUserAssoc (party_id, user_id, role, active) VALUES (?1,?2, \'admin\', 0)', partyId, userId);
    makePartyActive(platform, partyId, userId);
    return partyId;
}

//TODO: save npc/encounters per user
//TODO: change user name

export const regenerateInviteCode = async (platform: App.Platform, partyId: string, userId: string) => {
    const db = await ensureInit(platform);
    const role = await db.one('select role from PartyUserAssoc where party_id=?1 and user_id=?2', r => r.role as PartyRole, partyId, userId);

    if (role === 'admin') {
        await db.run('update Parties set invite_code=?2 where id=?1', partyId, generateId(10));
    }
}


export const makePartyActive = async (platform: App.Platform, partyId: string, userId: string) => {
    const db = await ensureInit(platform);
    await db.run('update PartyUserAssoc set active = (party_id = ?1) where user_id = ?2', partyId, userId);
}

export const activeParty = async (platform: App.Platform, userId: string) => {
    const db = await ensureInit(platform);
    return await db.one('select party_id from PartyUserAssoc where user_id = ?1 and active = 1', r => r.party_id as string, userId);
}


export const joinParty = async (platform: App.Platform, invite_code: string, userId: string) => {
    const db = await ensureInit(platform);
    const partyId = await db.one('select id from Parties where invite_code = ?1 and not exists (select 1 from PartyUserAssoc where party_id = id and user_id = ?2)', r => r.id as string, invite_code, userId);

    if (partyId) {
        await db.run('insert into PartyUserAssoc (party_id, user_id, role, active) VALUES (?1,?2, \'player\', 0)', partyId, userId);
        makePartyActive(platform, partyId, userId);
    }
}

export const setRole = async (platform: App.Platform, partyId: string, userId: string, actingUser: string, role: string) => {
    const db = await ensureInit(platform);
    const actingRole = await db.one('select role from PartyUserAssoc where user_id=?1 and party_id=?2', r => r.role as PartyRole, actingUser, partyId);
    if (actingRole === 'admin' && (role === 'admin' || role === 'player')) {
        await db.run('update PartyUserAssoc set role=?1 where party_id = ?2 and user_id = ?3', role, partyId, userId);
    }
}

export const closeParty = async (platform: App.Platform, partyId: string, userId: string) => {
    const db = await ensureInit(platform);
    const remainingPlayers = await db.all('select user_id, role from PartyUserAssoc where party_id = ?', r => ({ userId: r.user_id as string, role: r.role as PartyRole }), partyId);
    if (remainingPlayers.length === 1 && remainingPlayers[0].userId === userId) {
        await db.run('delete from PartyUserAssoc where party_id = ?', partyId);
        await db.run('delete from Parties where id = ?', partyId);
    }
}

export const leaveParty = async (platform: App.Platform, partyId: string, userId: string, actingUser: string) => {
    const db = await ensureInit(platform);
    const actingRole = await db.one('select role from PartyUserAssoc where user_id=?1 and party_id=?2', r => r.role as PartyRole, actingUser, partyId);
    if (actingRole === 'admin' || (actingRole === 'player' && userId === actingUser)) {
        const admins = await db.one('select count(1) as admins from PartyUserAssoc where party_id=?1 and user_id != ?2 and role=\'admin\'', r => r.admins as number, partyId, userId);
        if ((admins ?? 0) > 0) {
            await db.run('delete from PartyUserAssoc where user_id=?1 and party_id=?2', userId, partyId);
        }
    }
}

export const loadPartyWithUsers = async (platform: App.Platform, id: string, userId: string): Promise<PartyWithUsers | null> => {
    const db = await ensureInit(platform);
    const party: Party | null = await db.one(
        'select id, invite_code, name from Parties inner join PartyUserAssoc on party_id = id and user_id = ?2 where id = ?1',
        ({ id, invite_code, name }) => ({ id, inviteCode: invite_code, name } as Party), id, userId);

    if (party) {
        const users: PartyWithUsers['users'] = await db.all(
            'select role, id, username from PartyUserAssoc inner join User on user_id = id where party_id = ?1',
            r => ({ id: r.id, name: r.username, role: r.role } as PartyWithUsers['users'][number]),
            party.id
        );
        return { party, users }
    }

    return null;
}