export interface Party {
    id: string;
    inviteCode: string;
    name: string;
}

export type PartyRole = 'admin' | 'player';

export interface PartyWithUsers {
    party: Party;
    users: Array<{
        id: string;
        name: string;
        role: PartyRole;
    }>
}