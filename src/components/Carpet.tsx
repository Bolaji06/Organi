type CarpetProps = {
  title: string;
  bgColor: string;
  children: React.ReactNode;
};
export default function Carpet({ title, bgColor, children }: CarpetProps) {
  const header = {
    backgroundColor: `rgba(${bgColor}, 0.80)`,
  };
  const main = {
    backgroundColor: `rgba(${bgColor}, 0.07)`,
  };

  return (
    <>
      <main style={main} className="mb-4 pb-5">
        <div style={header} className={`rounded-tl-md rounded-tr-md px-2 py-3`}>
          <h2 className="text-white font-bold">{title}</h2>
        </div>
        <div className="px-2 py-3">{children}</div>
      </main>
    </>
  );
}
