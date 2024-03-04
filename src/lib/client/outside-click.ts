export const detectOutsideClick = (elem: Element, onClick: () => void) => {
    const handler = (e: MouseEvent): void => {
        let inside = false;
        for (let clickedOn = e.target as Element | null; clickedOn; clickedOn = clickedOn.parentElement) {
            if (clickedOn === elem) {
                inside = true;
            }
        }
        if (!inside) {
            onClick();
            document.documentElement.removeEventListener('click', handler);
        }
    };

    document.documentElement.addEventListener('click', handler);
}