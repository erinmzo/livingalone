const AuthTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-10 hidden md:block">
      <h2 className="text-[32px] font-bold text-center">{title}</h2>
    </div>
  );
};

export default AuthTitle;
