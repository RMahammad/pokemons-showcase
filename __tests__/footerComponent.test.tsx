import { render } from "@testing-library/react";
import Footer from "@/components/shared/Footer";

describe("Footer component", () => {
  it("renders social icons and newsletter section", () => {
    const { getByTestId, getByText } = render(<Footer />);

    // Check if social icons are rendered
    const socialIcons = getByTestId("social-icons");
    expect(socialIcons).toBeInTheDocument();

    // Check if newsletter section is rendered
    const newsletterSection = getByText("SIGN UP FOR THE NEWSLETTER!");
    expect(newsletterSection).toBeInTheDocument();
  });

  it("renders logo", () => {
    const { getByAltText } = render(<Footer />);

    const logoImage = getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
  });

  it("renders privacy menu links", () => {
    const { getByText } = render(<Footer />);

    // Check if privacy menu links are rendered
    const privacyLinks = getByText(/TERMS OF USE/i);
    expect(privacyLinks).toBeInTheDocument();
  });

  it("renders privacy text", () => {
    const { getByText } = render(<Footer />);

    // Check if privacy text is rendered
    const privacyText = getByText(/©️️️2021 Pokémon. ©️️️1995–2021 Nintendo/i);
    expect(privacyText).toBeInTheDocument();
  });

  it("renders Snorlax image", () => {
    const { getByAltText } = render(<Footer />);

    // Check if Snorlax image is rendered
    const snorlaxImage = getByAltText("snorlax");
    expect(snorlaxImage).toBeInTheDocument();
  });
});
