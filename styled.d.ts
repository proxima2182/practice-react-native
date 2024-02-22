// import original module declarations
import 'styled-components/native';


// and extend them!
declare module 'styled-components/native' {
    export interface DefaultTheme {
        mainBgColor: string;
        mainTextColor: string;
        mainContentColor: string;
        navBgColor: string;
        navTextColor: string;
    }
}
