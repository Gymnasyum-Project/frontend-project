import './HeaderComponent.css';

function HeaderComponent({
  title,
  subTitle,
  userInitials = 'AD',
  onProfileClick,
}) {


  return (
    <header className="header"  >
      <div>
        <p className="header_title">{title}</p>
        <p className="header_subtitle">{subTitle}</p>
      </div>
      <div></div>
      <button type="button" className="header_profile" onClick={onProfileClick}>
        {userInitials}
      </button>
    </header>
  );
}

export default HeaderComponent;