import axios from 'axios';
import cheerio from 'cheerio';
import InstagramData from '../models/InstagramData.js';


class ScrapeController {
  static async scrapeAndSaveData(baseUrl) {
    let page = 1;
    let nonAlphaBetaCount = 0;

    while (true) {
      try {

        const url = page === 1
          ? `${baseUrl}/?appcategory=instagram-instagram`
          : baseUrl;

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('.table-row').each(async (index, element) => {
          if (nonAlphaBetaCount >= 10) {
            return false;
          }

          const title = $(element).find('.appRowTitle a').text().trim();
          const versionMatch = title.match(/Instagram (\S+)/);

          if (!versionMatch) {
            console.log('Could not extract version from title:', title);
            return;
          }

          const version = versionMatch[1];


          // "alpha" or "beta" return
          if (/alpha|beta/i.test(title)) {
            console.log('Skipping alpha/beta version:', title);
            return;
          }

          try {

            const instagramData = new InstagramData({
              title,
              variantLink,
              version,
              releaseDate,
            });

            await instagramData.save();
            console.log('Data saved to MongoDB');

            nonAlphaBetaCount++;

          } catch (saveError) {
            console.error('Error saving data to MongoDB:', saveError.message);
          }

        });

        if (nonAlphaBetaCount >= 10) {
          break; 
        }

        page++;

      } catch (error) {
        console.error(`Error scraping APKMirror for page ${page}:`, error.message);
        break;
      }
    }
  }
}



export default ScrapeController;
