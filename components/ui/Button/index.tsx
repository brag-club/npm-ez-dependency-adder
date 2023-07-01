import React, {ButtonHTMLAttributes} from 'react';
import {cva, VariantProps} from "class-variance-authority";

const buttonVariants = cva("", {
    variants: {
        variant: {
            primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
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