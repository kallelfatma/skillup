import { NavLink, Link } from 'react-router-dom'

// Liens de la barre : NavLink ajoute automatiquement la classe "active"
// sur le lien de la page courante (mise en valeur demandée par l'énoncé).
const LIENS = [
  { to: '/', label: 'Accueil' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/favoris', label: 'Favoris' },
  { to: '/revisions', label: 'Révisions' },
  { to: '/assistant', label: 'Assistant IA' },
]

function Navbar({ nbFavoris }) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top su-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-mark" aria-hidden="true" />
          SkillUp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            {LIENS.map((lien) => (
              <li className="nav-item" key={lien.to}>
                <NavLink
                  to={lien.to}
                  end={lien.to === '/'}
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active fw-semibold' : '')
                  }
                >
                  {lien.label}
                  {lien.to === '/favoris' && nbFavoris > 0 && (
                    <span className="badge bg-warning text-dark ms-1">
                      {nbFavoris}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
