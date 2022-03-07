import Image, { ImageProps } from 'next/image';

export function StandardImage(props: ImageProps) {
  const { alt } = props;
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="relative h-48 w-full overflow-hidden">
        <Image {...props} alt={alt || ''} />
      </div>
    </div>
  );
}
