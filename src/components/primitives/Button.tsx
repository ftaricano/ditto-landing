import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

type SharedButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  showIcon?: boolean;
};

type AnchorButtonProps = SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; as?: 'a' };
type NativeButtonProps = SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; as?: 'button' };
type ButtonProps = PropsWithChildren<AnchorButtonProps | NativeButtonProps>;

export default function Button(props: ButtonProps) {
  const { children, className = '', variant = 'primary', showIcon = false } = props;
  const content = (
    <>
      <span>{children}</span>
      {showIcon ? <ArrowRight aria-hidden="true" size={16} strokeWidth={2} /> : null}
    </>
  );
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  if (isAnchorButton(props)) {
    const anchorProps = getAnchorProps(props);
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = getButtonProps(props);
  const type = (buttonProps.type ?? 'button') as 'button' | 'submit' | 'reset';

  return (
    <button className={classes} {...buttonProps} type={type}>
      {content}
    </button>
  );
}

function isAnchorButton(props: ButtonProps): props is PropsWithChildren<AnchorButtonProps> {
  return typeof props.href === 'string';
}

function getAnchorProps({ children, className, variant, showIcon, as, ...anchorProps }: PropsWithChildren<AnchorButtonProps>) {
  void children;
  void className;
  void variant;
  void showIcon;
  void as;
  return anchorProps;
}

function getButtonProps({ children, className, variant, showIcon, as, ...buttonProps }: PropsWithChildren<NativeButtonProps>) {
  void children;
  void className;
  void variant;
  void showIcon;
  void as;
  return buttonProps;
}
