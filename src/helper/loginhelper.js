export function isloggedin()
{
    const loggedInUser = localStorage.getItem("username");
    if(loggedInUser)
    {
        return loggedInUser
    }
    else
    {
        return false
    }
}

export function logoutuser()
{
   if(isloggedin())
   {
       localStorage.removeItem("username")
   }
}
