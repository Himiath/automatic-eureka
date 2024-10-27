import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { email, password } = await readBody(event);

  try {
    const { error, data } = await client.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;

    await client.from("user").insert({
      first_name: "John",
      last_name: "Doe",
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    return error;
  }
});
