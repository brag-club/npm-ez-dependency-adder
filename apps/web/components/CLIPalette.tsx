import React from "react";

interface CliPaletteProps {
    isActive: boolean;
    commandInitCode: string;
}

function CLIpalette({isActive, commandInitCode}: CliPaletteProps) {
    if(isActive){
        return (
            <div className="mt-1 flex w-full justify-center mb-1">
                <p>
                    ${commandInitCode} 
                </p>
            </div>
        );
    }
    else {
        return
    }
}

export default CLIpalette;
