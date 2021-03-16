module.exports = {
    'googleAuth': {
        'clientID': 'CLIENT_ID',
        'clientSecret': 'CLIENT_SECRET',
        'callbackURL': "http://localhost:5000/auth/google/callback"
    },
    'facebookAuth': {
        'clientID': 'CLIENT_ID',
        'clientSecret': 'CLIENT_SECRET',
        'callbackURL': "http://localhost:5000/auth/facebook/callback",
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name', 'photos']

    }
}