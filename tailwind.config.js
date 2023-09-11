/** @type {import('tailwindcss').Config} */
import flowbite  from 'flowbite/plugin'
import typography from 'flowbite-typography'
import colors from 'tailwindcss/colors'

export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.slate.600'),
                        'h1,h2,h3': {
                            color: theme('colors.gray.800'),
                        },                        
                    }
                }        
            }),
            button:{
                primary: 'bg-blue-500 text-white hover:bg-blue-600'
            },
            colors:{
                primary: colors.violet,
                transparent: 'transparent',
            },
            
            
        },
    },
    plugins: [   
        flowbite,
        typography
    ]
};
