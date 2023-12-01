import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const buttonVariants = cva("px-4 py-2", {
    variants: {
        variant: {
            primary: "rounded bg-primary text-white disabled:bg-red-400",
            secondary: "rounded bg-secondary",
        },
        size: {
            default: "w-max",
            full: "w-full",
        },
        animation: {
            none: "",
            active: "active:scale-95",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
        animation: "active",
    },
});

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button: React.FC<ButtonProps> = ({
    className,
    animation,
    variant,
    size,
    children,
    ...props
}) => {
    return (
        <button className={buttonVariants({ variant, className, size, animation })} {...props}>
            {children}
        </button>
    );
};

export default Button;
