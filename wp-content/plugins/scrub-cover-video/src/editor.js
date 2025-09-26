const { addFilter } = wp.hooks;
const { ToggleControl, PanelBody } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

const TARGET = 'core/cover';
const ATTR = 'pootleScrubVideo';

function addAttribute( settings, name ) {
  if ( name !== TARGET ) return settings;
  settings.attributes = {
    ...settings.attributes,
    [ATTR]: { type: 'boolean', default: false },
  };
  return settings;
}
addFilter('blocks.registerBlockType', 'scv/add-attr', addAttribute);

// Show toggle when background is video
const withToggle = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    if ( props.name !== TARGET ) return <BlockEdit {...props} />;
    const { attributes, setAttributes } = props;
    const isVideo = attributes?.backgroundType === 'video' || !!attributes?.useFeaturedImage === false && !!attributes?.url && attributes?.isDark !== undefined && attributes?.hasParallax !== undefined; // fallback check
    return (
      <Fragment>
        <BlockEdit {...props} />
        { isVideo && (
          <InspectorControls>
            <PanelBody title="Scroll scrub">
              <ToggleControl
                label="Scroll-scrub background video"
                checked={ !!attributes[ATTR] }
                onChange={ (val) => setAttributes({ [ATTR]: !!val }) }
                help="Sync the video's playback with scroll position on the front-end."
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  };
}, 'withToggle' );
addFilter('editor.BlockEdit', 'scv/toggle', withToggle);

// Save data attribute on front-end markup
function addSaveProps( extraProps, blockType, attributes ) {
  if ( blockType.name !== TARGET ) return extraProps;
  if ( attributes?.[ATTR] ) {
    extraProps = { ...extraProps, 'data-scrub-video': 'true' };
  }
  return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'scv/save-props', addSaveProps);
