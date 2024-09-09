import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Station02 } from "../pages/Station02";

describe(Station02, () => {
  test("フォーム表示", async () => {
    render(<Station02 />);

    expect(screen.getByText("認証")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("サインイン")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();

    expect(screen.getByLabelText("メールアドレス")).toBeTruthy();
    expect(screen.getByLabelText("パスワード")).toBeTruthy();
  });

  test("メールアドレス入力", async () => {
    render(<Station02 />);
    const user = userEvent.setup();
    const mailForm = screen.getByLabelText("メールアドレス");
    await user.type(mailForm, "mail@xxx.xxx");
    expect(mailForm).toHaveValue("mail@xxx.xxx");
  });
 
  test("パスワード入力", async () => {
    render(<Station02 />);
    const user = userEvent.setup();
    const passwordForm = screen.getByLabelText("パスワード");
    await user.type(passwordForm, "Password1234");
    expect(passwordForm).toHaveValue("Password1234");
  });
});
