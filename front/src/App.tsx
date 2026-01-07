import React from 'react';

export default function App() {
	return (
		<div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'grid', placeItems: 'center' }}>
			<div style={{ textAlign: 'center', padding: 24 }}>
				<h1 style={{ margin: 0, fontSize: 32 }}>App Template</h1>
				<p style={{ marginTop: 8, color: 'var(--muted)' }}>Start building your app here.</p>
			</div>
		</div>
	);
}
