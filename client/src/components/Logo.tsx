type LogoProps = {
  icon: React.ReactNode;
};

const Logo = (props: LogoProps) => {
  return (
    <div className="w-1/5 ">
      <div className="flex gap-x-2 items-center cursor-pointer w-fit">
        {props.icon}
        <h1 className="font-bold mb-1 tracking-wider">Laros</h1>
      </div>
    </div>
  );
};

export default Logo;
