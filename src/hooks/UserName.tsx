import { useUser } from "./UserContext";

export function UserName(){
    const { user } = useUser();
    if (user == null) {
        return <h1>Loading...</h1>;
    }

    return (
        <h1>
            { user.name || 'Name not found' }
        </h1>
    )
}