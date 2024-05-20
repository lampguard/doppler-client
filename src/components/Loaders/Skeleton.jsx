const Skeleton = ({ className = "", children }) => {
  return <div className={"skeleton " + className}>{children}</div>;
};

export default Skeleton;
