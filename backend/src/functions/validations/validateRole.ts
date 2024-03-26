
export default function isValidRole(role:string) {
    const validRoles = ['Community Manager', 'Party Leader', 'Supreme Leader'];
    return validRoles.includes(role);
}