import { features } from '@/constants';


const FeaturesSection = () => {
  return (
         <section className="py-20 bg-[color:var(--background)]">
      <div className="container-max px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-4">
             
                <div className="w-12 h-12 rounded-lg bg-[color:var(--primary-fixed)] flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-[color:var(--primary)]" />
                </div>

          
                <div className="flex-1">
                  <h3 className="text-label-lg font-semibold text-[color:var(--foreground)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-[color:var(--on-surface-variant)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection