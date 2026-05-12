import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle
  const { logout } = useAuth(); // for handling logout
  const navigate = useNavigate(); // for programmatic navigation
  const menuRef = useRef<HTMLDivElement>(null); // to detect clicks outside the menu

  // Close the menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle navigation and close menu
  function handleNavigate(path: string) {
    navigate(path);
    setIsOpen(false);
  }

  // Handle logout and redirect to login page
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div ref={menuRef} className="fixed top-0 left-0 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-4 p-2 bg-white rounded-lg shadow"
      >
        {isOpen ? '閉じる' : 'メニュー'}
      </button>

      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg mx-4">
          <nav className="flex flex-col">
            <button onClick={() => handleNavigate('/scan')} className="px-6 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
              スキャン
            </button>
            <button onClick={() => handleNavigate('/devices')} className="px-6 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
              PC一覧
            </button>
            <button onClick={() => handleNavigate('/search')} className="px-6 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
              社員検索
            </button>
            <button onClick={() => handleNavigate('/qr')} className="px-6 py-3 text-left hover:bg-gray-50 border-b border-gray-100">
              QR生成
            </button>
            <button onClick={handleLogout} className="px-6 py-3 text-left text-red-500 hover:bg-gray-50">
              ログアウト
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
