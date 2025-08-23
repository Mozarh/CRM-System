import { Button } from '../Button/Button.tsx';
import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  alt: string;
  size?: number;
}

export const ButtonIcon: React.FC<IButtonProps> = ({
  icon,
  alt,
  size = 25,
  ...props
}) => {
  return (
    <Button variant="icon" title={alt} {...props}>
      <img src={icon} alt={alt} width={size} height={size} />
    </Button>
  );
};
