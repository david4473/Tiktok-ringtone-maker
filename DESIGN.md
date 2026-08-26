# Design

<!-- impeccable:design-schema 1 -->

## Visual World

The interface is a simple browser downloader page inspired by VEED's tool structure: calm pale background, centered headline, one prominent paste field, one clear action, and friendly rounded sections below. It should feel fast, approachable, and almost self-explanatory.

## Palette

Use white as the default canvas with deep ink, very soft theme-tinted support surfaces, and one vivid action color. The page supports three modes: white with purple actions, dark with lavender actions, and orange with orange actions. Buttons, chips, loading states, waveform accents, and editor controls inherit the active mode.

## Typography

Use a clean system UI stack with large rounded display sizing for the main heading, normal sentence-case labels, and compact body text. Avoid technical utility styling except where file formats are shown.

## Components

Borrow the component grammar from the requested resources in a restrained way: shadcn-style accessible inputs/buttons/cards, VEED-like centered downloader form, beUI/RareUI-style gentle button press and loading states, Beautiful UI-style concise status panels, and transitions.dev-inspired smooth resize/reveal timing.

## Motion

Motion is minimal: button press feedback, soft panel entrance, loading spinner/shimmer, and smooth editor reveal. Reduced-motion users receive instant state changes.

## Layout

The first viewport is a single-purpose downloader surface: headline, supporting sentence, theme switcher, paste field, primary button, fair-use note, and four inline benefit labels. The waveform editor appears directly below after a successful URL. SEO and guide content remain below as seamless page content separated by spacing rather than bordered sections.
