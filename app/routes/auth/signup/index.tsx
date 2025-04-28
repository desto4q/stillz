import { Form, Link, useActionData, useNavigation } from "react-router";
import { useState } from "react";
import type { Route } from "../../post+/$post/+types";
import FlexCenter from "~/components/FlexCenter";

export const action = async ({ request }: Route.ActionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
};
export default function index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FlexCenter>
      <form className="bg-base-200 p-8 rounded-md flex flex-col border w-full max-w-lg">
        <h2>STEELD</h2>
        <div>ss</div>
      </form>
    </FlexCenter>
  );
}
