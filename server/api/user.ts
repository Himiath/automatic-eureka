import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  // Check if the user is authenticated
  if (!user) {
    return {
      statusCode: 401,
      body: { error: "Auth session missing!" },
    };
  }

  try {
    // Fetch user data from the database
    const { data, error } = await client
      .from("user")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: { error: error.message },
    };
  }
});
