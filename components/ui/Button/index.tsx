import React, {ButtonHTMLAttributes} from 'react';
import {cva, VariantProps} from "class-variance-authority";

const buttonVariants = cva("active:scale-95 py-2 px-4", {
    variants: {
        variant: {
            primary: "bg-primary text-white rounded",
            secondary: "bg-secondary rounded",
        },
        size: {
            default: "w-min",
            full: "w-full"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "default"
    },

})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {

}

const Button: React.FC<ButtonProps> = ({className, variant, size, children, ...props}) => {
    return (
        <button className={buttonVariants({variant, className, size})} {...props}>
            {children}
        </button>
    );
};

export default Button;