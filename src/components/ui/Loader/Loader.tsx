function Loader(props: {
  width?: string;
  height?: string;
  borderColor?: string;
}) {
  const { width = '2rem', height = '2rem', borderColor = 'black' } = props;

  return (
    <div
      className={`animate-spin border-2 rounded-full`}
      style={{
        borderColor: borderColor,
        width: width,
        height: height,
        borderTopColor: 'transparent',
      }}
    />
  );
}

export { Loader };
