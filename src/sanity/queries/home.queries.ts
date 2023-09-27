import {groq} from 'next-sanity'

import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'
import {dzInterstitialProps} from './components/dzInterstitialProps'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const homeData = groq`
*[_type == 'home'] {
  ...,
  header[]-> {
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition":  {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  featured->{
    _type == "exhibitionPage" => {
      title,
      _type,
      "exhibition":  {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    },
    _type == "article" => {
      _type,
      title,
      subtitle,
      description,
      image {
        type,
        image {
          _type,
          alt,
          "url": asset->url,
          asset->{
            assetId,
            _id,
            altText,
            title,
            description
          },
        }
      },
      publishDate,
      slug,
      category,
      primarySubtitle,
      type,
    }
  },
  firstCarousel{
    ...,
    items[]->{
      ...,
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition":  {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  secondCarousel{
    ...,
    items[]->{
      ...,
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition":  {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  articles[]-> { ... },
  locations[]-> {...},
  interstitial {
    ${dzInterstitialProps}
  },
  seo {
    ${pageSEOFields}
  }
}`
