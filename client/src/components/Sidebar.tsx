const Sidebar = () => {
  return (
    <div
      className="fixed right-0 top-0 w-1/4 h-full z-50 bg-white text-black"
      onClick={(e) => e.stopPropagation}
    >
      <p>hi</p>
    </div>
  );
};

export default Sidebar;
