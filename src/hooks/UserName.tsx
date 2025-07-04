import { useUser } from "./UserContext";

export function UserName(){
    const { user } = useUser();
    if (!user) {
        throw new Error("UserContext not provided.");
    }

    return (
        <h1>
            { user.name || 'Name not found' }
        </h1>
    )
}