export function setAccessToken(token) {
    localStorage.setItem('accessToken', token); // Update the token
}

export function getAccessToken() {
    return localStorage.getItem('accessToken'); // Retrieve the token
}

export function getEmail(){
    return localStorage.getItem('email');
}

export function setEmail(email) {
    localStorage.setItem('email', email);
}

export function setName(name) {
    localStorage.setItem('name', name);
}

export function getName() {
    return localStorage.getItem('name');
}

export function setProjectCount(project_count) {
    localStorage.setItem('project_count', project_count);
}

export function getProjectCount() {
    return localStorage.getItem('project_count');
}

export function setMemberId(member_id) {
    return localStorage.setItem('member_id', member_id);
}

export function getMemberId() {
    return localStorage.getItem('member_id');
}