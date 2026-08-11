import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

export const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
  titleStyles
}: Props) => {
  const metricContent = (
    <>
      {imgUrl ? (
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      ) : (
        <div
          className='rounded-full object-contain w-4 h-4'
          style={{
            background: 'linear-gradient(250deg, #7b2ff7, #f107a3) no-repeat'
          }}
        />
      )}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        {title ? (
          <span
            className={cn(
              `small-regular line-clamp-1 ${isAuthor && 'max-sm:hidden'}`,
              titleStyles
            )}
          >
            {title}
          </span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className='flex-center gap-1'>
      {metricContent}
    </Link>
  ) : (
    <div className='flex-center gap-1'>{metricContent}</div>
  );
};
