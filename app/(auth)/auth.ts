Credentials({
  credentials: {},
  async authorize(email, password) {
    const users = await getUser(email);

    if (users.length === 0) {
      await compare(password, DUMMY_PASSWORD);
      return null;
    }

    const [user] = users;

    if (!user.password) {
      await compare(password, DUMMY_PASSWORD);
      return null;
    }

    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) return null;

    return { ...user, type: 'regular' };
  },
}),
// 🚫 Disabled guest login temporarily
// Credentials({
//   id: 'guest',
//   credentials: {},
//   async authorize() {
//     const [guestUser] = await createGuestUser();
//     return { ...guestUser, type: 'guest' };
//   },
// }),
