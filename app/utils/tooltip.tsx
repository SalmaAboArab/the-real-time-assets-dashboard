export const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => (
  <div className="relative group inline-block">
    {children}
    <span
      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded-md 
                     opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap"
    >
      {text}
    </span>
  </div>
);
