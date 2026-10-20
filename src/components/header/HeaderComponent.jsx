// src/components/layout/HeaderComponent.jsx
import { IoSearch } from 'react-icons/io5';
import './HeaderComponent.css';

function HeaderComponent({
  title,
  subTitle,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Cari customer...',
  userInitials = 'AD',
  onProfileClick,
}) {
  return (
    <header className="header"  >
      <div>
        <p className="header_title">{title}</p>
        <p className="header_subtitle">{subTitle}</p>
      </div>

      <div className="header_search">
        <IoSearch className="header_search-icon" size={16} aria-hidden="true" />
        <input
          type="search"
          className="header_search-input"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <button type="button" className="header_profile" onClick={onProfileClick}>
        {userInitials}
      </button>
    </header>
  );
}

export default HeaderComponent;