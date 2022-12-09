<?php

namespace Database\Seeders;

use App\Models\License;
use App\Models\Plan;
use App\Models\PlanFeature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $featureRollOverNextMonth = PlanFeature::where('name', 'Unused downloads roll over to the next month')->first();
        $featureAdditionImage = PlanFeature::where('name', 'Additional images for $1 each')->first();
        $featureCopiesCount = PlanFeature::where('name', 'Circulation up to 500,000 copies')->first();
        $featureSupport = PlanFeature::where('name', '24/7 support')->first();

        $licensePerpetualRight = License::where('name', 'Perpetual rights to use images')->first();
        $licenseCommercialUse = License::where('name', 'Commercial use')->first();
        $licensePersonalUse = License::where('name', 'Personal use')->first();
        $licenseUnlimitedJobs = License::where('name', 'Unlimited number of jobs (U-EL)')->first();
        $licenseWebUse = License::where('name', 'Web use (W-EL)')->first();
        $licensePrint = License::where('name', 'Use for printing (P-EL)')->first();
        $licenseSale1 = License::where('name', 'Sale of rights (SR-EL 1)')->first();
        $licenseSale3 = License::where('name', 'Sale of rights (SR-EL 3)')->first();
        $licenseSale0 = License::where('name', 'Sale of rights (SR-EL)')->first();
        $licenseFree = License::where('name', 'Free')->first();


        $planStandard = new Plan();
        $planStandard->name = 'Standard';
        $planStandard->description = '';
        $planStandard->image_count = 15;
        $planStandard->amount = 100;
        $planStandard->access_level = 2;
        $planStandard->save();

        $planExtended = new Plan();
        $planExtended->name = 'Extended';
        $planExtended->description = '';
        $planExtended->image_count = 50;
        $planExtended->amount = 200;
        $planExtended->access_level = 2;
        $planExtended->save();

        $planEnterprise = new Plan();
        $planEnterprise->name = 'Enterprise';
        $planEnterprise->description = '';
        $planEnterprise->image_count = 60;
        $planEnterprise->amount = 300;
        $planEnterprise->access_level = 3;
        $planEnterprise->save();

        $planUltimate = new Plan();
        $planUltimate->name = 'Ultimate';
        $planUltimate->description = '';
        $planUltimate->image_count = 100;
        $planUltimate->amount = 400;
        $planUltimate->access_level = 3;
        $planUltimate->save();





        /////////////


        $planStandard->licenses()->attach($licensePerpetualRight);
        $planStandard->licenses()->attach($licenseCommercialUse);
        $planStandard->licenses()->attach($licensePersonalUse);


        $planStandard->planFeatures()->attach($featureRollOverNextMonth);
        $planStandard->planFeatures()->attach($featureAdditionImage);
        $planStandard->planFeatures()->attach($featureCopiesCount);


        /////////////

        $planExtended->licenses()->attach($licensePerpetualRight);
        $planExtended->licenses()->attach($licenseCommercialUse);
        $planExtended->licenses()->attach($licensePersonalUse);
        $planExtended->licenses()->attach($licenseWebUse);


        $planExtended->planFeatures()->attach($featureRollOverNextMonth);
        $planExtended->planFeatures()->attach($featureAdditionImage);
        $planExtended->planFeatures()->attach($featureCopiesCount);
        $planExtended->planFeatures()->attach($featureSupport);

        /////////////

        $planEnterprise->licenses()->attach($licensePerpetualRight);
        $planEnterprise->licenses()->attach($licenseCommercialUse);
        $planEnterprise->licenses()->attach($licensePersonalUse);
        $planEnterprise->licenses()->attach($licenseUnlimitedJobs);
        $planEnterprise->licenses()->attach($licenseWebUse);
        $planEnterprise->licenses()->attach($licensePrint);
        $planEnterprise->licenses()->attach($licenseSale1);
        $planEnterprise->licenses()->attach($licenseSale3);
        $planEnterprise->licenses()->attach($licenseSale0);

        $planEnterprise->planFeatures()->attach($featureRollOverNextMonth);
        $planEnterprise->planFeatures()->attach($featureAdditionImage);
        $planEnterprise->planFeatures()->attach($featureCopiesCount);
        $planEnterprise->planFeatures()->attach($featureSupport);


        /////////////

        $planUltimate->licenses()->attach($licensePerpetualRight);
        $planUltimate->licenses()->attach($licenseCommercialUse);
        $planUltimate->licenses()->attach($licensePersonalUse);
        $planUltimate->licenses()->attach($licenseUnlimitedJobs);
        $planUltimate->licenses()->attach($licenseWebUse);
        $planUltimate->licenses()->attach($licensePrint);
        $planUltimate->licenses()->attach($licenseSale1);
        $planUltimate->licenses()->attach($licenseSale3);
        $planUltimate->licenses()->attach($licenseSale0);

        $planUltimate->planFeatures()->attach($featureRollOverNextMonth);
        $planUltimate->planFeatures()->attach($featureAdditionImage);
        $planUltimate->planFeatures()->attach($featureCopiesCount);
        $planUltimate->planFeatures()->attach($featureSupport);

        $planStandard->save();
        $planExtended->save();
        $planEnterprise->save();
        $planUltimate->save();

    }
}
