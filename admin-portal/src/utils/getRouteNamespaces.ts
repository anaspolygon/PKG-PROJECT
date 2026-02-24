/**
 * Determines which translation namespaces are needed for different routes
 */

export function getRouteNamespaces(pathname: string): string[] {
  // Always include common namespace
  const namespaces = ['common' ,];

  // Guest routes
  if (pathname.startsWith('/auth/')) {
    return [...namespaces, 'auth', 'terms'];
  }

  // Onboarding routes
  if (pathname.startsWith('/onboarding/')) {
    const onboardingNamespaces = ['login', 'entry', 'nominee', 'nid-verification', 'liveliness',  'success', 'othersInformation' , "review"];
    
    // Specific onboarding pages
    if (pathname.includes('/welcome')) return [...namespaces, 'entry'];
    if (pathname.includes('/login')) return [...namespaces, 'login' ,"terms" ,"auth"];
    if (pathname.includes('/nominee')) return [...namespaces, 'nominee'];
    if (pathname.includes('/nid')) return [...namespaces, 'nid-verification'];
    if (pathname.includes('/liveliness')) return [...namespaces, 'liveliness',"common","nid-verification"];
    if (pathname.includes('/otp')) return [...namespaces, 'otp' ,"common" , "login"];
    if (pathname.includes('/success')) return [...namespaces, 'success'];
    if (pathname.includes('/others_information')) return [...namespaces, 'othersInformation', 'nid-verification']; 
    if (pathname.includes('/personal_info')) return [...namespaces, 'common', 'nid-verification',"liveliness"]; 
    
    
    // Default onboarding namespaces for dynamic routes
    return [...namespaces, ...onboardingNamespaces];
  }

  // Admin/logged-in routes
  if (pathname.startsWith('/dashboard')) {
    return [...namespaces, 'LocaleSwitcher'];
  }
  
  if (pathname.startsWith('/applications')) {
    return [...namespaces, 'LocaleSwitcher'];
  }
  
  if (pathname.startsWith('/users')) {
    return [...namespaces, 'LocaleSwitcher'];
  }

  if (pathname.startsWith('/roles')) {
    return [...namespaces, 'LocaleSwitcher'];
  }

  if (pathname.startsWith('/branches')) {
    return [...namespaces, 'LocaleSwitcher'];
  }

  // Default: load minimal namespaces
  return [...namespaces, 'LocaleSwitcher'];
}
