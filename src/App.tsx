import React, { useState } from 'react';
import { Home, Award, CheckCircle, Phone, Mail, MapPin, Star, Shield, TrendingUp } from 'lucide-react';

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  rodoConsent: boolean;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  rodoConsent?: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    phone: '',
    rodoConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj prawidłowy adres email';
    }

    if (!formData.rodoConsent) {
      newErrors.rodoConsent = 'Zgoda na przetwarzanie danych jest wymagana';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://n8n.procesflow.pl/webhook-test/898405ac-2f90-4602-bc34-78180805728e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone || null,
          rodoConsent: formData.rodoConsent,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ firstName: '', email: '', phone: '', rodoConsent: false });
      } else {
        alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
      }
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900"></div>

        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center">
            <img src="/83r9p1uwquwpmiinhgzfhqsbbho.avif" alt="Elite Property Logo" className="w-10 h-10" />
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <span className="text-[#D4AF37] text-sm font-semibold">DARMOWE 10 STRON E-BOOKA</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sprzedaj swoją <span className="text-[#D4AF37]">nieruchomość</span>
              <br />szybko i korzystnie <span className="text-[#D4AF37]">SAMEMU!</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Otrzymaj bezpłatnie pierwsze 10 stron naszego e-booka i poznaj podstawy sprzedaży każdego mieszkania.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href="#formularz" className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-lg hover:bg-[#C9A961] transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 w-full sm:w-auto">
                Pobierz darmową część e-booka
              </a>
              <a href="#kontakt" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg rounded-lg hover:bg-[#D4AF37]/10 transition-all w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Zadzwoń teraz
              </a>
            </div>

            <div className="flex justify-center">
              <img
                src="/e-book_(10_stron).avif"
                alt="Okładka e-booka - Pierwsze 10 stron"
                className="w-64 h-auto rounded-xl shadow-2xl shadow-[#D4AF37]/20 border border-zinc-800 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </header>

      {/* Benefits Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Co znajdziesz w <span className="text-[#D4AF37]">darmowych 10 stronach e-booka?</span>
            </h2>
            <p className="text-xl text-gray-300 font-semibold">
              Zrób to sam i oszczędź pieniądze!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-black border border-zinc-800 rounded-xl p-8 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Jak rzeczywiście ocenić mieszkanie</h3>
              <p className="text-gray-400 leading-relaxed">
                Co poprawić, co zostawić - jak wydobyć z niego jak najwięcej i na co kupujący zwraca uwagę.
              </p>
            </div>

            <div className="bg-black border border-zinc-800 rounded-xl p-8 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Checklista stanu technicznego mieszkania</h3>
              <p className="text-gray-400 leading-relaxed">
                Cała lista, dzięki której zadbasz o każdy szczegół, który ma znaczenie.
              </p>
            </div>

            <div className="bg-black border border-zinc-800 rounded-xl p-8 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Homestaging dla Twojego mieszkania</h3>
              <p className="text-gray-400 leading-relaxed">
                Przykłady i opis jak wykorzystać pierwsze wrażenie w sprzedaży nieruchomości (jak najniższym kosztem).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formularz" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-12">
                  <div className="inline-block mb-4 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
                    <span className="text-[#D4AF37] text-sm font-semibold">POBIERZ TERAZ</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Otrzymaj <span className="text-[#D4AF37]">darmowe 10 stron e-booka</span>
                  </h2>

                  <p className="text-xl text-gray-300">
                    Wpisz swoje dane, a e-book otrzymasz natychmiast na podany adres email
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                        Imię <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${
                          errors.firstName ? 'border-red-500' : 'border-zinc-700'
                        } rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors text-white`}
                        placeholder="Wpisz swoje imię"
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Adres email <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black border ${
                          errors.email ? 'border-red-500' : 'border-zinc-700'
                        } rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors text-white`}
                        placeholder="twoj@email.pl"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Numer telefonu <span className="text-gray-500">(opcjonalnie)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors text-white"
                        placeholder="+48 123 456 789"
                      />
                    </div>

                    <div>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="rodoConsent"
                          checked={formData.rodoConsent}
                          onChange={handleInputChange}
                          className={`mt-1 mr-3 w-5 h-5 bg-black border ${
                            errors.rodoConsent ? 'border-red-500' : 'border-zinc-700'
                          } rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer`}
                        />
                        <span className="text-sm text-gray-300">
                          Wyrażam zgodę na przetwarzanie moich danych osobowych przez Best Investments w celu kontaktu oraz przedstawienia oferty zgodnie z RODO. <span className="text-[#D4AF37]">*</span>
                        </span>
                      </label>
                      {errors.rodoConsent && (
                        <p className="mt-2 text-sm text-red-500">{errors.rodoConsent}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-lg hover:bg-[#C9A961] transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? 'Wysyłanie...' : 'Pobierz darmowe 10 stron e-booka'}
                    </button>

                    <p className="text-sm text-gray-400 text-center">
                      Podając swoje dane, zgadzasz się na otrzymywanie informacji handlowych.
                      Możesz zrezygnować w każdej chwili.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="bg-zinc-900 border border-[#D4AF37]/30 rounded-2xl p-8 md:p-10 text-center">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                </div>

                <h3 className="text-3xl font-bold mb-4">Dziękujemy!</h3>

                <p className="text-xl text-gray-300 mb-6">
                  E-book został wysłany na Twój adres email. Sprawdź swoją skrzynkę odbiorczą
                  (oraz folder spam, jeśli nie widzisz wiadomości).
                </p>

                <p className="text-lg text-gray-400 mb-8">
                  Masz pytania? Skontaktuj się z nami telefonicznie lub mailowo.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37]/10 transition-all"
                >
                  Wróć do formularza
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
                  <span className="text-[#D4AF37] text-sm font-semibold">O NAS</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  O nas
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Nasz zespół to doświadczeni specjaliści, pasjonaci nieruchomości i eksperci, którzy naprawdę słuchają. Wspólnie tworzymy przestrzeń, w której liczy się zaufanie, skuteczność i indywidualne podejście do każdego klienta.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Bezpłatna wycena nieruchomości przez certyfikowanych rzeczoznawców</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Kompleksowa obsługa prawna i pomoc w załatwianiu formalności</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Profesjonalna sesja zdjęciowa i marketing nieruchomości</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Negocjacje cenowe i pełna opieka do momentu podpisania aktu notarialnego</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">10</div>
                    <div className="text-sm text-gray-400">Lat doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">98%</div>
                    <div className="text-sm text-gray-400">Zadowolonych klientów</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/diqjy4sn42v6hxm9k26fjcpggy copy.avif"
                  alt="Nasz zespół"
                  className="w-full h-auto rounded-2xl border border-zinc-800 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Co mówią <span className="text-[#D4AF37]">nasi klienci?</span>
            </h2>
            <p className="text-xl text-gray-300">
              Setki zadowolonych klientów, którzy z sukcesem sprzedali swoje nieruchomości
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-black border border-zinc-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Profesjonalizm, rzetelność i pomoc do samego końca, tak zapamiętam współpracę z panem Filipem Liberda z Best Investments, przy zakupie naszego mieszkania. Mimo wielu przeciwności losu, dzięki pomocy p. Filipa transakcja zakończyła się sukcesem. Dziękujemy i polecamy z całego ❤️"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#D4AF37] font-bold">MŁ</span>
                </div>
                <div>
                  <div className="font-semibold">Miko Łaj</div>
                  <div className="text-sm text-gray-400">Bydgoszcz</div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Jestem bardzo zadowolony ze współpracy z biurem Best Investments. Przez kilka miesięcy próbowałem sprzedać swoją nieruchomość w Bydgoszczy i nic z tego nie wychodziło. Po zgłoszeniu się do Best Investments sprawa ruszyła z miejsca. Pełne zaangażowanie, nowoczesne podejście i konkretne działania. Mieszkanie sprzedało się w 2 tygodnie, i to o 25 000 zł drożej niż planowałem. Polecam każdemu."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#D4AF37] font-bold">MA</span>
                </div>
                <div>
                  <div className="font-semibold">Marek Antonowski</div>
                  <div className="text-sm text-gray-400">Bydgoszcz</div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Z pełnym przekonaniem polecam to biuro nieruchomości. Profesjonalne podejście, doskonała komunikacja i pełne zaangażowanie od początku do końca. Jeśli szukasz rzetelnego pośrednika, to miejsce będzie strzałem w dziesiątkę."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#D4AF37] font-bold">M</span>
                </div>
                <div>
                  <div className="font-semibold">Marcel</div>
                  <div className="text-sm text-gray-400">Bydgoszcz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center mb-6">
                <img src="/83r9p1uwquwpmiinhgzfhqsbbho.avif" alt="Elite Property Logo" className="w-10 h-10" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Profesjonalna obsługa w zakresie sprzedaży i wynajmu nieruchomości.
                Zaufaj naszemu doświadczeniu.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Telefon</div>
                    <a href="tel:+48515616384" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                      +48 515 616 384
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:kontakt@bestinvestments.pl" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                      kontakt@bestinvestments.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Lokalizacja</div>
                    <p className="text-gray-400">
                      Gołębia 85/3, 85-309 Bydgoszcz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-400 text-sm">
              © 2025 <a href="https://procesflow.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Procesflow</a>. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;