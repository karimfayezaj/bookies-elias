import { Preferences } from "@capacitor/preferences";


export const logOutUser = async (setIsLoggedIn) => {
    await Preferences.set({ key: 'Email', value: '' });
    await Preferences.set({ key: 'Password', value: '' });
    setIsLoggedIn(false);
    console.log("Logging Out");
}


