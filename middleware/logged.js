export default function (context) {
  if (!context.$auth.loggedIn && context.route.path.includes('/lk')) {
    return context.redirect('/login')
  } else if (context.$auth.loggedIn && context.route.path.includes('/login')) {
    context.redirect('/lk/dashboard')
  } else if (context.$auth.loggedIn && context.route.path === '/lk') {
    return context.redirect('/lk/dashboard')
  }
}
