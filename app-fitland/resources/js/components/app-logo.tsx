import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <img
          src="/images/logo.png"
          alt="FitLand"
          className="h-15 w-auto object-contain"
        />
      </div>
    );
  }
