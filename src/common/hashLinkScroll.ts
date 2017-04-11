// https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604
export function hashLinkScroll() {
    const { hash } = window.location;

    if (hash !== "") {
        // Push onto callback queue so it runs after the DOM is updated,
        // this is required when navigating from a different page so that
        // the element is rendered on the page before trying to getElementById.
        setTimeout(() => {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            
            if (element) {
                document.body.scrollTop = 0;
                element.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}