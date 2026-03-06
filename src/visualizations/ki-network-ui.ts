import { KiLink } from './ki-network-types';

export function getLinkLabel(l: KiLink) {
    const type = l.ref_type || 'mention';
    const typeLabel = (type === 'formal' || type === 'explicit') 
        ? 'Explicit file path' 
        : type === 'bold' 
            ? '<strong>Bold</strong> mention' 
            : 'Simple mention';
    return `<div class="link-label"><strong>${typeLabel}</strong></div>`;
}

export function setupUI(on2D: () => void, on3D: () => void) {
    const btn2D = document.getElementById('view-2d');
    const btn3D = document.getElementById('view-3d');
    
    if (btn2D && btn3D) {
        btn2D.onclick = () => {
            btn2D.classList.add('active');
            btn3D.classList.remove('active');
            on2D();
        };
        btn3D.onclick = () => {
            btn3D.classList.add('active');
            btn2D.classList.remove('active');
            on3D();
        };
    }
}
