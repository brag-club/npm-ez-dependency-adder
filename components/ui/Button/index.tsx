import React, {ButtonHTMLAttributes} from 'react';
import {cva, VariantProps} from "class-variance-authority";

const buttonVariants = cva("active:scale-95 py-2 px-4", {
    variants: {
        variant: {
            primary: "bg-primary text-white rounded",
            secondary: "bg-secondary rounded",
        }
    },
    defaultVariants: {
        variant: "primary"
    }
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {

}

const Button: React.FC<ButtonProps> = ({className, variant, children, ...props}) => {
    return (
        <button className={buttonVariants({variant, className})} {...props}>
            {children}
        </button>
    );
};

export default Button;