export function switchView(btn: HTMLElement | null, view: string) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + view)?.classList.add('active');
    if (btn) btn.classList.add('active');

    const title = document.getElementById('overlay-title') as HTMLElement;
    const desc = document.getElementById('overlay-desc') as HTMLElement;

    if (view === '3d') {
        title.innerText = 'Immersive Neural Graph';
        desc.innerText = "Explore the high-dimensional dependency mapping of the agent's memory. Drag to rotate, Scroll to zoom.";
    } else if (view === '2d') {
        title.innerText = 'Kinetic Physics Map';
        desc.innerText = 'Flat relational mapping with force-directed stabilization. Direct SSOT verification.';
    }
    
    return view;
}

export function updateFullscreenUI(isFullscreen: boolean) {
    document.body.classList.toggle('is-fullscreen', isFullscreen);
    return isFullscreen;
}

export function getLinkLabel(l: { ref_type?: string }) {
    const type = l.ref_type || 'mention';
    const typeLabel = type === 'formal' ? 'Explicit file path' : type === 'bold' ? '<strong>Bold</strong> mention' : 'Simple mention';
    return `<div class="link-label"><strong>${typeLabel}</strong></div>`;
}
