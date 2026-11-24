async function loadApplication() {
  try {
    console.log("Fetching user and post details...");

    const [userResponse, postResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/posts/1')
    ]);

    const user = await userResponse.json();
    const post = await postResponse.json();

    console.log("User:", user);
    console.log("Post:", post);

    console.log("Successfully fetched");
  } catch (error) {
    console.error("Failed to load application:", error);
  }
}

loadApplication();
