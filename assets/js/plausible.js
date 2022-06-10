import Plausible from "plausible-tracker";

const { trackPageview } = Plausible({
  domain: "docs.zeevo.co",
});

trackPageview();
